import sys
sys.path.append('/app/backend/todo')
from _cfunc import lib
import os.path
import numpy as np
import time
from django.shortcuts import render
from django.conf import settings
from rest_framework import status, viewsets
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import TodoSerializer
from .models import Todo

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()
    
    def convert_grade(self, grade):
        mapping = {'A+': 4.33,
                'A': 4.0,
                'A-': 3.67,
                'B+': 3.33,
                'B': 3.0,
                'B-': 2.67,
                'C+': 2.33,
                'C': 2.0,
                'C-': 1.67,
                'D': 1.0,
                }
        if grade in mapping:
            return mapping[grade]
        return 0


    @action(detail=False, methods=["get"], url_path='calc', url_name='calc')
    def calc(self, request):
        # Obtain grades and units from database
        courses = self.get_queryset().filter(completed=True)
        get_grades = courses.values_list('grade', flat=True)
        get_units = courses.values_list('units', flat=True)
        
        # Convert letter grades to float
        vfunc = np.vectorize(self.convert_grade)
        grades, units = np.sum(vfunc(get_grades)), np.sum(get_units)
        
        # Call C function to calculate GPA
        gpa = lib.calc_gpa(grades, units)
        
        return Response(gpa)