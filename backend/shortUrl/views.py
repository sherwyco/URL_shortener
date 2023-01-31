from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import ShortUrl
from .serializers import ShortUrlSerializer
# from django.shortcuts import redirect


class ShortUrlListApiView(APIView):
    permission_classes = [permissions.AllowAny]

    # 1. List all
    def get(self, request, *args, **kwargs):
        '''
        List all the shortened urls
        '''
        short_url = ShortUrl.objects.all()
        serializer = ShortUrlSerializer(short_url, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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

    # 4. Update
    # def put(self, request, id, *args, **kwargs):
    #     '''
    #     Updates the shorten url with given id if exists
    #     '''
    #     short_url_instance = self.get_object(id)
    #     if not short_url_instance:
    #         return Response(
    #             {"res": "Object with short url id does not exists"},
    #             status=status.HTTP_400_BAD_REQUEST
    #         )
    #     data = {
    #         'original_url': request.data.get('original_url'),
    #     }
    #     serializer = ShortUrlSerializer(
    #         instance=short_url_instance, data=data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 5. Delete
    def delete(self, request, id, *args, **kwargs):
        '''
        Deletes the short url with given id if exists
        '''
        short_url_instance = self.get_object(id)
        if not short_url_instance:
            return Response(
                {"res": "Object with short url id does not exists"},
                status=status.HTTP_400_BAD_REQUEST
            )
        short_url_instance.delete()
        return Response(
            {"res": "Object deleted!"},
            status=status.HTTP_200_OK
        )


# def short_url_redirect(request, code, *args, **kwargs):
#     short_url_instance = ShortUrl.objects.filter(short_code=code)
#     if short_url_instance.exists():
#         link = short_url_instance.get(short_code=code).original_url
#         return redirect(link)
#     else:
#         return redirect("/")
