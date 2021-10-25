from django.urls import path
from .views import AdaptationListView, AdaptationDetailView

urlpatterns = [
    path('', AdaptationListView.as_view()),
    path('<int:pk>/', AdaptationDetailView.as_view())
]