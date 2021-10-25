from .common import GenreSerializer
from adaptations.serializers.common import AdaptationSerializer

class PopulatedGenreSerializer(GenreSerializer):
    adaptations = AdaptationSerializer(many=True)