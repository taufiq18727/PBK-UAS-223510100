<template>
  <div>
    <div class="AlbumDetails-container">
      <select v-model="selectedAlbum" @change="fetchPhotos" class="select-album">
        <option disabled value=""></option>
        <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.title }}</option>
      </select>
      <div v-if="photos.length" class="photo-grid">
        <div v-for="photo in photos" :key="photo.id" class="photo-item">
          <img :src="photo.thumbnailUrl" @click="showPhoto(photo.url)" class="thumbnail">
        </div>
      </div>
      <div v-else class="no-photos">
        <p>No photos available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAlbumsStore } from '../stores/AlbumStore'

const router = useRouter()
const selectedAlbum = ref(null)
const albums = ref([])
const photos = ref([])

const albumsStore = useAlbumsStore()

const fetchAlbums = async () => {
  try {
    await albumsStore.fetchAlbums()
    albums.value = albumsStore.albums
  } catch (error) {
    console.error('Error fetching albums:', error)
  }
}

const fetchPhotos = async () => {
  if (selectedAlbum.value) {
    try {
      await albumsStore.fetchPhotos(selectedAlbum.value)
      photos.value = albumsStore.photos
    } catch (error) {
      console.error('Error fetching photos:', error)
    }
  }
}

const showPhoto = (url) => {
  window.open(url, '_blank')
}

onMounted(() => {
  fetchAlbums()
})

watch(selectedAlbum, (newAlbum) => {
  if (newAlbum) {
    fetchPhotos()
    router.push(`/albums/${newAlbum}`)
  }
})
</script>

<style scoped>
.AlbumDetails-container {
  width: 800px;
  max-width: 100%;
  margin: 40px auto;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  background-color: #f0f8ff;
  transition: transform 0.3s, box-shadow 0.3s;
}

.AlbumDetails-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.title {
  color: #333;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 20px;
}

.select-album {
  width: 100%;
  padding: 12px;
  margin-bottom: 25px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s;
}

.select-album:focus {
  border-color: #007bff;
  outline: none;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.photo-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.thumbnail {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 2px solid #007bff;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, border-color 0.3s;
}

.thumbnail:hover {
  transform: scale(1.05);
  border-color: #0056b3;
}

.no-photos {
  text-align: center;
  margin-top: 30px;
}

.no-photos p {
  font-size: 1.2rem;
  color: #555;
}
</style>
