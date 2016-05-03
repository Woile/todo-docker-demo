import falcon

from slugify import slugify

from .models import ToDo


class BaseResource:
    """Base implementation of a resource."""

    model = None

    def get_queryset(self):
        return self.model.objects.all()

    def on_get(self, req, resp, **kwargs):
        if kwargs:
            return self.retrieve(req, resp, **kwargs)
        return self.list(req, resp)

    def on_post(self, req, resp, **kwargs):
        if kwargs:
            raise falcon.HTTPMethodNotAllowed(['PATCH', 'PUT'])
        return self.create(req, resp)

    def on_patch(self, req, resp, **kwargs):
        if not kwargs:
            raise falcon.HTTPMethodNotAllowed(['POST'])
        return self.update(req, resp, **kwargs)

    def on_put(self, req, resp, **kwargs):
        if not kwargs:
            raise falcon.HTTPMethodNotAllowed(['POST'])
        return self.update(req, resp, **kwargs)

    def on_delete(self, req, resp, **kwargs):
        if not kwargs:
            raise falcon.HTTPMethodNotAllowed([])
        self.delete(req, resp, **kwargs)

    def list(self, req, resp):
        resp.body = self.get_queryset().to_json()
        resp.status = falcon.HTTP_OK

    def create(self, req, resp):
        obj = self.model.objects.create(**req.context['data'])
        resp.body = obj.to_json()
        resp.status = falcon.HTTP_CREATED

    def retrieve(self, req, resp, **kwargs):
        try:
            obj = self.model.objects.get(hid=kwargs.pop('id'))
        except self.model.DoesNotExist:
            raise falcon.HTTPNotFound()
        else:
            resp.body = obj.to_json()
            resp.status = falcon.HTTP_OK

    def update(self, req, resp, **kwargs):
        try:
            obj = self.model.objects.get(hid=kwargs.pop('id'))
        except self.model.DoesNotExist:
            raise falcon.HTTPNotFound()
        else:
            data = req.context['data']
            for attr, value in data.items():
                if isinstance(value, list):
                    obj.populate_embedded(value)
                else:
                    setattr(obj, attr, value)
            obj.save()
            resp.body = obj.to_json()
            resp.status = falcon.HTTP_OK

    def delete(self, req, resp, **kwargs):
        try:
            obj = self.model.objects.get(hid=kwargs.pop('id'))
        except self.model.DoesNotExist:
            raise falcon.HTTPNotFound()
        else:
            obj.delete()
            resp.status = falcon.HTTP_OK


class ToDoResource(BaseResource):
    """Handles everything related to TODOS.
    
    list
    create
    retrieve
    delete
    """

    model = ToDo

    def create(self, req, resp, **kwargs):
        req.context['data']['slug'] = slugify(req.context['data']['title'])
        super().create(req, resp, **kwargs)
