from django.db import models

# Create your models here.
class Adaptation(models.Model):
    name = models.CharField(max_length=50, default=None)
    synopsis = models.TextField(max_length=1000, default=None)
    author = models.CharField(max_length=50, default=None)
    book_release_year = models.PositiveIntegerField(default=None)
    book_image = models.CharField(max_length=500, default=None)
    director = models.CharField(max_length=50, default=None)
    movie_release_year = models.PositiveIntegerField(default=None)
    movie_image = models.CharField(max_length=500, default=None)
    book_link = models.CharField(max_length=500, blank=True)
    movie_link = models.CharField(max_length=50, blank=True)
    genres = models.ManyToManyField(
        'genres.Genre',
        related_name = "adaptations",
        blank=True
    )

    def __str__(self):
        return f"{self.name}"