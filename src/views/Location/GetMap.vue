<template>
  <div>
    <h2>Real-Time Location</h2>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p v-else>
      Latitude: {{ location.lat }} <br>
      Longitude: {{ location.lng }} <br>
      Place Name: {{ placeName }}
    </p>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

const location = reactive({ lat: null, lng: null });
const placeName = ref('');
let watchId = null;
let error = null;

// Function to get place name from coordinates using OpenStreetMap
const getPlaceName = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    );
    placeName.value = res.data.display_name;
  } catch (err) {
    error = 'Failed to get place name';
  }
};

onMounted(() => {
  if ('geolocation' in navigator) {
    watchId = navigator.geolocation.watchPosition(
      (pos) => {
        location.lat = pos.coords.latitude;
        location.lng = pos.coords.longitude;
        getPlaceName(location.lat, location.lng);
      },
      (err) => {
        error = "Permission denied or unable to get location.";
      },
      { enableHighAccuracy: true }
    );
  } else {
    error = "Geolocation not supported by your browser.";
  }
});

onUnmounted(() => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
  }
});
</script>