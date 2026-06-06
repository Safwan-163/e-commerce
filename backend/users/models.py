from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.utils import timezone
from django.db import models, IntegrityError, transaction

class User(AbstractUser):

    class Role(models.TextChoices):
        CUSTOMER = "02", "Customer"
        EMPLOYEE = "01", "Employee"

    role = models.CharField(max_length=2, choices=Role.choices)

    user_code = models.CharField( max_length=20,unique=True, blank=True)
    
    @staticmethod
    def generate_user_code(role):

        now = timezone.now()

        year = str(now.year)[-2:]
        month = f"{now.month:02d}"

        prefix = f"{year}{month}{role}"

        last_user = User.objects.filter(
            user_code__startswith=prefix
        ).order_by('-id').first()

        if last_user:
            last_serial = int(last_user.user_code[-4:])
            new_serial = last_serial + 1
        else:
            new_serial = 1

        return f"{prefix}{new_serial:04d}"

    def save(self, *args, **kwargs):

        if self.user_code:
            super().save(*args, **kwargs)
            return

        for _ in range(20):

            try:

                with transaction.atomic():

                    self.user_code = self.generate_user_code(
                        self.role
                    )

                    super().save(*args, **kwargs)

                    return

            except IntegrityError:

                self.user_code = None

                continue

        raise ValueError(
            "Could not generate unique user_code"
        )


class Customer(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="customer_profile"
    )
    phone = models.CharField(max_length=20)
    address = models.TextField()


class Employee(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="employee_profile"
    )
    phone = models.CharField(max_length=20)
    address = models.TextField()
    #salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)