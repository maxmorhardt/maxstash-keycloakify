rm -rf dist_keycloak

npm run build-keycloak-theme

cd dist_keycloak
unzip maxstash-keycloakify.jar
cd ..

docker buildx build --platform linux/arm64/v8 . \
	-t maxmorhardt/maxstash-keycloakify:0.0.6 \
	-t maxmorhardt/maxstash-keycloakify:latest

docker push maxmorhardt/maxstash-keycloakify -a