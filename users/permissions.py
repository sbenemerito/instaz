from rest_framework import permissions


class IsSelfOrReadOnly(permissions.BasePermission):
    """
    Object-level permission for Users to only allow themselves to edit their
    own User instance.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Instance must be the reqquest.user himself/herself.
        return obj == request.user
