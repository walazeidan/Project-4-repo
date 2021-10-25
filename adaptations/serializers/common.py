from django.db import models
from django.db.models import fields
from rest_framework import serializers
from ..models import Adaptation

class AdaptationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adaptation
        fields = '__all__'
