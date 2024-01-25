<template>
    <div class="asignar-tarea-container">
      <h2>Asignar Evaluación a Estudiante</h2>
      <form @submit.prevent="asignarEvaluacion">

        <div class="form-group">
          <label for="estudiante">Seleccionar Estudiante:</label>
          <select v-model="selectedEstudiante" id="estudiante" required>
            <option v-for="estudiante in listaEstudiantes" :key="estudiante.id" :value="estudiante.id">
              {{ estudiante.nombre }}
            </option>
          </select>
        </div>
  

        <div class="form-group">
          <label for="evaluacion">Seleccionar Evaluación:</label>
          <select v-model="selectedEvaluacion" id="evaluacion" required>
            <option v-for="evaluacion in listaEvaluaciones" :key="evaluacion.id" :value="evaluacion.id">
              {{ evaluacion.titulo }}
            </option>
          </select>
        </div>
  
        <div class="form-group">
          <button type="submit">Asignar Evaluación</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        selectedEstudiante: null,
        selectedEvaluacion: null,
      };
    },
    methods: {
      asignarEvaluacion() {

        const data = {
          estudianteId: this.selectedEstudiante,
          evaluacionId: this.selectedEvaluacion,
        };
  
        axios.post('http://localhost:3000/api/asignaciones', data)
          .then(response => {

            alert('Evaluación asignada con éxito:', response.data);
          })
          .catch(error => {

            alert('Error al asignar la evaluación:', error);
          });
      },
    },
    props: ['listaEstudiantes', 'listaEvaluaciones'],
  };
  </script>
  
  <style scoped>
  .asignar-tarea-container {
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
  