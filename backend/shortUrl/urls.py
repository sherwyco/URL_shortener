from django.urls import path
from . import views


urlpatterns = [
    path('shortener/', views.ShortUrlListApiView.as_view()),
    path('shortener/<int:id>/', views.ShortUrlDetailApiView.as_view()),
]
