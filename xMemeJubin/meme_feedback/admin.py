from django.contrib import admin
from .models import MemeFeedback


class MemeFeedbackAdmin(admin.ModelAdmin):
    list_display = ['name','caption', 'image_url','date','image_file']


admin.site.register(MemeFeedback, MemeFeedbackAdmin)