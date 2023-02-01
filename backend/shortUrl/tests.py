from django.test import TestCase
from .models import ShortUrl
from .utils import generate_code


class AnimalTestCase(TestCase):
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
