"""RBAC Initial Permissions"""

from rest_framework.viewsets import ModelViewSet

from authentik.core.api.used_by import UsedByMixin
from authentik.core.api.utils import ModelSerializer
from authentik.rbac.models import InitialPermissions


class InitialPermissionsSerializer(ModelSerializer):
    """InitialPermissions serializer"""

    class Meta:
        model = InitialPermissions
        fields = [
            "pk",
            "name",
            "mode",
            "role",
            "permissions",
        ]


class InitialPermissionsViewSet(UsedByMixin, ModelViewSet):
    """InitialPermissions viewset"""

    queryset = InitialPermissions.objects.all()
    serializer_class = InitialPermissionsSerializer
    search_fields = ["role__name"]
    ordering = ["role__name"]
    filterset_fields = ["role__name"]
