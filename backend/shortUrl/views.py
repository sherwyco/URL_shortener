from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import ShortUrl
from .serializers import ShortUrlSerializer
from .pagination import CustomPagination


class ShortUrlListApiView(APIView):
    permission_classes = [permissions.AllowAny]

    # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the shortened urls
        '''
        short_urls = ShortUrl.objects.all()
        paginator = CustomPagination()
        paginator.page_query_param = 'page'
        paginator.page_size_query_param = 'per_page'
        paginator.max_page_size = 50
        result_page = paginator.paginate_queryset(short_urls, request)
        serializer = ShortUrlSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)

    # 2. Create
    def post(self, request, *args, **kwargs):
        '''
        Shorten a url with a given link
        '''
        data = {
            'original_url': request.data.get('original_url')
        }
        serializer = ShortUrlSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ShortUrlDetailApiView(APIView):
    permission_classes = [permissions.AllowAny]

    def get_object(self, id):
        '''
        Helper method to get the object with given id
        '''
        try:
            return ShortUrl.objects.get(id=id)
        except ShortUrl.DoesNotExist:
            return None

    # 3. Retrieve
    def get(self, request, id, *args, **kwargs):
        '''
        Retrieves the shorten url with given id
        '''
        short_url_instance = self.get_object(id)
        if not short_url_instance:
            return Response(
                {"res": "Object with id: %d does not exists" % id},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ShortUrlSerializer(short_url_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 4. Update -- out of scope

    # 5. Delete
    def delete(self, request, id, *args, **kwargs):
        '''
        Deletes the short url with given id if exists
        '''
        short_url_instance = self.get_object(id)
        if not short_url_instance:
            return Response(
                {"res": "Object with id: %d does not exists" % id},
                status=status.HTTP_400_BAD_REQUEST
            )
        short_url_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )


class ShortUrlCodeApiView(APIView):
    # retrieve original url via short code
    def get(self, request, code, *args, **kwargs):
        '''
        retrieve original url via short code
        '''
        short_url = ShortUrl.objects.filter(short_code=code)
        if not short_url.exists():
            return Response(
                {"res": "Object with code: %s does not exists" % code},
                status=status.HTTP_400_BAD_REQUEST
            )
        short_obj = short_url.first()
        serializer = ShortUrlSerializer(short_obj)
        response = Response(serializer.data, status=status.HTTP_200_OK)
        response['Location'] = short_obj.original_url
        return response
