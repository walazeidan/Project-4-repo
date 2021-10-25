from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status


from .models import Adaptation
from .serializers.common import AdaptationSerializer
from .serializers.populated import PopulatedAdaptationSerializer

class AdaptationListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, )

    def get(self, _request):
        adaptations = Adaptation.objects.all()
        serialized_adaptations = PopulatedAdaptationSerializer(adaptations, many=True)
        return Response(serialized_adaptations.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data['owner'] = request.user.id
        adaptation_to_add = AdaptationSerializer(data=request.data)
        if adaptation_to_add.is_valid():
            adaptation_to_add.save()
            return Response(adaptation_to_add.data, status=status.HTTP_201_CREATED)
        return Response(adaptation_to_add.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class AdaptationDetailView(APIView):

    def get_adaptation(self, pk):
        try:
            return Adaptation.objects.get(pk=pk)
        except Adaptation.DoesNotExist:
            raise NotFound(detail="🆘 Can't find title")

    def get(self, _request, pk):
        adaptation = self.get_adaptation(pk=pk)
        serialzed_adaptation = PopulatedAdaptationSerializer(adaptation)
        return Response(serialzed_adaptation.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        adaptation_to_delete = self.get_adaptation(pk=pk)
        adaptation_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        adaptation_to_update = self.get_adaptation(pk=pk)
        updated_adaptation = AdaptationSerializer(adaptation_to_update, data=request.data)
        if updated_adaptation.is_valid():
            updated_adaptation.save()
            return Response(updated_adaptation.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_adaptation.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
