from django.db import models

# Create your models here.
class User(models.Model):
    # username = models.CharField(max_length=150, unique=True)
    # email = models.EmailField(unique=True)
    # password = models.CharField(max_length=128)

    def __str__(self):
        return self.username
    
class Employee(models.Model):
    # name = models.CharField(max_length=100)
    # email = models.EmailField(unique=True)
    # phone_number = models.CharField(max_length=20)
    # department = models.CharField(max_length=100)
    # position = models.CharField(max_length=100)
    # salary = models.DecimalField(max_digits=10, decimal_places=2)
    # hire_date = models.DateField()
    # is_active = models.BooleanField(default=True)
    #NID_= models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class Customer(models.Model): 
    # name = models.CharField(max_length=100)
    # email = models.EmailField(unique=True)
    # phone_number = models.CharField(max_length=20)
    # address = models.TextField()

    def __str__(self):
        return self.name



