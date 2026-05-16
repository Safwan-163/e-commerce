from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.utils import timezone


class User(AbstractUser):

    class Role(models.TextChoices):
        CUSTOMER = "02", "Customer"
        EMPLOYEE = "01", "Employee"

    role = models.CharField(max_length=2, choices=Role.choices)

    # 🔥 Custom display ID
    user_code = models.CharField(max_length=20, unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.user_code:
            now = timezone.now()

            year = now.strftime("%y")
            month = now.strftime("%m")
            role = self.role

            count = User.objects.filter(
                role=self.role,
                date_joined__year=now.year,
                date_joined__month=now.month
            ).count() + 1

            sequence = str(count).zfill(3)

            self.user_code = f"{year}{month}{role}{sequence}"

        super().save(*args, **kwargs)


# =========================
# CUSTOMER
# =========================
class Customer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="customer_profile"
    )

    phone = models.CharField(max_length=20)
    address = models.TextField()


# =========================
# EMPLOYEE
# =========================
class Employee(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="employee_profile"
    )

    phone = models.CharField(max_length=20)
    address = models.TextField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)