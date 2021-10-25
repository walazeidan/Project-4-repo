from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models.deletion import CASCADE
from django.db.models.fields import DateTimeField

# Create your models here.

class Review(models.Model):
    spoilers = models.BooleanField(default=False)
    book_rating = ArrayField(
        ArrayField(
            models.IntegerField(validators = [MinValueValidator(1), MaxValueValidator(5)])
        )
    )
    movie_rating = ArrayField(
        ArrayField(
            models.IntegerField(validators = [MinValueValidator(1), MaxValueValidator(5)])
        )
    )
    text = models.TextField(max_length=300, blank=True)
    differences = models.TextField(max_length=300, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    title = models.ForeignKey(
        "adaptations.Adaptation",
        related_name="reviews",
        on_delete=models.CASCADE
    )
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="reviews",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.title} - {self.created_at}"