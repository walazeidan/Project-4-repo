from rest_framework import serializers
from .common import AdaptationSerializer
from reviews.serializers.populated import PopulatedReviewSerializer
from genres.serializers.common import GenreSerializer

class PopulatedAdaptationSerializer(AdaptationSerializer):
    reviews = PopulatedReviewSerializer(many=True)
    genres = GenreSerializer(many=True)