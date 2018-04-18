import datetime
import json

from markdown import markdown
from micawber import bootstrap_basic, parse_html
from peewee import *

oembed = None
pg_db = None
proxy = Proxy()

class Note(Model):
    title = TextField()
    text = TextField()
    html = TextField()
    timestamp = DateTimeField(default=datetime.datetime.now)

    class Meta:
        database = proxy

    @classmethod
    def all(cls):
        return (Note
            .select()
            .order_by(Note.timestamp.desc()))

def setup(ctx):
    global pg_db, oembed
    if pg_db is None:
        _, db = ctx["serviceBindings"].popitem()
        pg_db = PostgresqlDatabase(
            db["database"],
            user=db["username"],
            password=db["password"],
            host=db["host"],
            port=db["port"])
        proxy.initialize(pg_db)
        proxy.connect(reuse_if_open=True)
        proxy.create_tables([Note])
    if oembed is None:
        oembed = bootstrap_basic()

def get_notes(ctx, payload):
    notes = []
    for note in Note.all():
        notes.append({
            "date": int(note.timestamp.timestamp()),
            "title": note.title,
            "text": note.text,
            "html": note.html
        })
    return notes

def add_note(ctx, payload):
    html = parse_html(
        markdown(payload["text"]),
        oembed,
        maxwidth=300,
        urlize_all=True)
    note = Note.create(title=payload["title"], text=payload["text"], html=html)
    return {
        "date": int(note.timestamp.timestamp()),
        "title": note.title,
        "text": note.text,
        "html": note.html
    }

def handle(ctx, payload):
    setup(ctx)
    if ctx["httpContext"]["method"] == "POST":
        return add_note(ctx, payload)
    return get_notes(ctx, payload)
