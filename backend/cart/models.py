from django.db import models

# Create your models here.
class Cart(models.Model):
    user = models.ForeignKey('users.Customer', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart for {self.user.username}"
