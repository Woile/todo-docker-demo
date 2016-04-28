import mongoengine


class Task(mongoengine.EmbeddedDocument):
    """An element of the ToDo."""

    hid = mongoengine.SequenceField()
    content = mongoengine.StringField()
    is_done = mongoengine.BooleanField(default=False)


class ToDo(mongoengine.Document):
    """Data of the todo containing multiple tasks."""

    def __unicode__(self):
        return self.slug

    hid = mongoengine.SequenceField()  # helper_id
    title = mongoengine.StringField()
    slug = mongoengine.StringField()
    tasks = mongoengine.EmbeddedDocumentListField(Task)

    def populate_embedded(self, elements):
        for data in elements:
            hid = data.get('hid')
            try:
                task = self.tasks.get(hid=hid)
            except mongoengine.errors.DoesNotExist:
                task = self.tasks.create(**data)
            else:
                for k, v in data.items():
                    setattr(task, k, v)
            task.save()
