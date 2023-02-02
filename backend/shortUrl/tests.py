from rest_framework import status
from rest_framework.test import APITestCase
from django.test import TestCase
from .models import ShortUrl
from .utils import generate_code


class ShortUrlTestCase(TestCase):
    def setUp(self):
        ShortUrl.objects.create(
            original_url="https://docs.djangoproject.com/en/4.1/topics/testing/overview/")
        ShortUrl.objects.create(
            original_url="https://docs.djangoproject.com/en/4.1/")

    def test_short_urls_are_created_with_short_codes(self):
        first = ShortUrl.objects.get(
            original_url="https://docs.djangoproject.com/en/4.1/topics/testing/overview/")
        second = ShortUrl.objects.get(
            original_url="https://docs.djangoproject.com/en/4.1/")

        self.assertTrue(first.short_code)
        self.assertTrue(second.short_code)

    def test_code_generator_length_is_7(self):
        code = generate_code()
        self.assertEqual(len(code), 7)


class ShortUrlApiTestCase(APITestCase):
    def setUp(self):
        ShortUrl.objects.create(
            original_url="https://willbedeleted.com")

    def test_create_short_url(self):
        """
        Ensure object creation for short url
        """
        link = 'https://www.django-rest-framework.org/api-guide/testing/'
        data = {'original_url': link}
        response = self.client.post('/shortener/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(ShortUrl.objects.filter(original_url=link).exists())
        self.assertEqual(ShortUrl.objects.get(
            original_url=link).original_url, link)

    def test_get_all(self):
        response = self.client.get('/shortener/', format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_retrieve_by_id(self):
        id = ShortUrl.objects.first().pk
        response = self.client.get('/shortener/' + str(id), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_by_id(self):
        id = ShortUrl.objects.get(
            original_url='https://willbedeleted.com').pk
        response = self.client.delete('/shortener/' + str(id), format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_code_url(self):
        short_code = ShortUrl.objects.first().short_code
        response = self.client.get('/' + short_code, format='json')
        self.assertEqual(response.status_code,
                         status.HTTP_301_MOVED_PERMANENTLY)
