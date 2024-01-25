<template>
    <div class="ingresar-estudiante-container">
      <h2>Ingresar Nuevo Estudiante</h2>
      <form @submit.prevent="ingresarEstudiante">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="nuevoEstudiante.nombre" required>
        </div>
  
        <div class="form-group">
          <label for="edad">Edad:</label>
          <input type="number" id="edad" v-model="nuevoEstudiante.edad" required>
        </div>
  
        <div class="form-group">
          <label for="carrera">Carrera:</label>
          <input type="text" id="carrera" v-model="nuevoEstudiante.carrera" required>
        </div>
  
        <div class="form-group">
          <button type="submit">Ingresar Estudiante</button>
        </div>
      </form>

      <div v-if="listaEstudiantes.length > 0">
      <h3>Lista de Estudiantes:</h3>
      <ul>
        <li v-for="(estudiante, index) in listaEstudiantes" :key="index">
          {{ estudiante.nombre }} - {{ estudiante.edad }} años - {{ estudiante.carrera }}
        </li>
      </ul>
    </div>

    </div>
  </template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      nuevoEstudiante: {
        nombre: '',
        edad: null,
        carrera: '',
      },
      listaEstudiantes: [],
    };
  },
  methods: {
    ingresarEstudiante() {
      axios.post('http://localhost:3000/api/estudiantes', this.nuevoEstudiante)
        .then(response => {
          this.listaEstudiantes = response.data;
          console.log('Estudiante ingresado con éxito:', response.data);
          alert('Estudiante ingresado con éxito!');
        })
        .catch(error => {
          console.error('Error al ingresar el estudiante:', error);
          alert('Error al ingresar el estudiante:', error);
        });
    },
  },
  mounted() {
    axios.get('http://localhost:3000/api/estudiantes')
      .then(response => {
        this.listaEstudiantes = response.data;
        console.log('Lista de estudiantes cargada:', response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de estudiantes:', error);
      });
  },
};
</script>
  
  <style scoped>
  .ingresar-estudiante-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  input,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  