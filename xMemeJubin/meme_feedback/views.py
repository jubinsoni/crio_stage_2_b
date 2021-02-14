from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.parsers import FormParser, MultiPartParser
from .serializers import MemeFeedbackSerializer
from .models import MemeFeedback

class MemeFeedbackListAPIView(ListCreateAPIView):
    serializer_class = MemeFeedbackSerializer
    #parser_classes = (FormParser, MultiPartParser)

    queryset = MemeFeedback.objects.all()
    #permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        #return serializer.save(owner=self.request.user)
        # entry = MemeFeedback.objects.create(owner=self.request.data.get('owner'),
        #                                 caption=self.request.data.get('caption'),
        #                                 url_field=self.request.data.get('url_field'),
        #                                 image=self.request.data.get('image'))

        #return serializer.save()
        #return entry.save()
        return serializer.save()

    def get_queryset(self):
        #return self.queryset.filter(owner=self.request.user)
        return self.queryset.order_by('-id')[:100]

class MemeFeedbackDetailAPIView(RetrieveUpdateAPIView):
    serializer_class = MemeFeedbackSerializer
    #parser_classes = (FormParser, MultiPartParser)

    #permission_classes = (permissions.IsAuthenticated , IsOwner,)
    queryset = MemeFeedback.objects.all()
    lookup_field = "id"
    
    def get_queryset(self):
        #return self.queryset.filter(owner=self.request.user)
        return self.queryset
    
    def perform_update(self, serializer):
        # print(serializer)
        if (self.request.method == 'PATCH'):
            print(self.request.data)
            rem_field = serializer.validated_data.pop('name', None)
        return serializer.save()