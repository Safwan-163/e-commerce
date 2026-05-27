from rest_framework import serializers
from .models import User, Customer, Employee


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['phone', 'address']


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['phone', 'address']
        read_only_fields = ['salary'] 


class UserSerializer(serializers.ModelSerializer):
    customer_profile = CustomerSerializer(read_only=True)
    employee_profile = EmployeeSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'user_code', 'username', 'role', 'customer_profile', 'employee_profile']