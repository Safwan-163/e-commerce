from django.db import models

# Create your models here.
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    role = models.CharField(max_length=20)  # 'customer' or 'employee'

    def __str__(self):
        return str(self.username)
    
class Employee(User):
    employee_id = models.AutoField(primary_key=True)
    address= models.TextField()
    phone= models.CharField(max_length=20)
    email = models.EmailField(unique=True)

    def __str__(self):
        return str(self.username)

class Customer(User): 
    Customer_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=20)
    address = models.TextField()

    def __str__(self):
        return str(self.username)



