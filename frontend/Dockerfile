# # Production stage only - no build
# FROM nginx:stable-alpine

# # Set working directory
# WORKDIR /usr/share/nginx/html

# # Copy prebuilt dist folder from host machine
# COPY dist/ ./

# # Copy custom nginx config if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 4000

# CMD ["nginx", "-g", "daemon off;"]


FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

# Nếu đã build rồi thì không cần dòng này
# RUN npm run build

EXPOSE 4173  

CMD ["npm", "run", "preview"]