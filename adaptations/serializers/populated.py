from rest_framework import serializers
from .common import AdaptationSerializer
from reviews.serializers.common import ReviewSerializer
from genres.serializers.common import GenreSerializer

class PopulatedAdaptationSerializer(AdaptationSerializer):
    reviews = ReviewSerializer(many=True)
    genres = GenreSerializer(many=True)