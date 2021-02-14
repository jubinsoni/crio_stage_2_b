from rest_framework import serializers
from .models import MemeFeedback


class MemeFeedbackSerializer(serializers.ModelSerializer):

    # def __init__(self, *args, **kwargs):
    #     kwargs['partial'] = True
    #     super(MemeFeedbackSerializer, self).__init__(*args, **kwargs)

    class Meta:
        model = MemeFeedback
        fields = ['id','name','caption','date','image_url','image_file']