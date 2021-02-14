from django.urls import path
from . import views

urlpatterns = [
    path('', views.MemeFeedbackListAPIView.as_view(), name="meme_feedbacks"),
    path('<int:id>', views.MemeFeedbackDetailAPIView.as_view(), name="meme_feedback"),
]