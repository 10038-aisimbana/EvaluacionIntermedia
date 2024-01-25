<template>
  <div class="crear-tarea-container">
    <h2>Crear Nueva Evaluación</h2>
    <form @submit.prevent="crearEvaluacion">
      <div class="form-group">
        <label for="titulo">Título de la Evaluación:</label>
        <input type="text" id="titulo" v-model="nuevaEvaluacion.titulo" required>
      </div>

      <div class="form-group">
        <label for="pregunta">Pregunta:</label>
        <input type="text" id="pregunta" v-model="nuevaEvaluacion.pregunta" required>
      </div>


      <div class="form-group">
        <label for="respuesta">Respuesta:</label>
        <textarea id="respuesta" v-model="nuevaEvaluacion.respuesta" required></textarea>
      </div>

      <div class="form-group">
        <button type="submit">Crear Evaluación</button>
      </div>
    </form>

    <div v-if="listaEvaluaciones.length > 0">
      <h3>Lista de Evaluaciones:</h3>
      <ul>
        <li v-for="(evaluacion, index) in listaEvaluaciones" :key="index">
          <strong>{{ evaluacion.titulo }}</strong>
          <p>{{ evaluacion.pregunta }}</p>
          <p>Respuesta: {{ evaluacion.respuesta }}</p>
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
      nuevaEvaluacion: {
        titulo: '',
        pregunta: '',
        respuesta: '',
      },
      listaEvaluaciones: [],
    };
  },
  methods: {
    crearEvaluacion() {
      axios.post('http://localhost:3000/api/evaluaciones', this.nuevaEvaluacion)
        .then(response => {

          alert('Evaluación creada con éxito:', response.data);

          this.cargarListaEvaluaciones();
        })
        .catch(error => {

          alert('Error al crear la evaluación:', error);
        });
    },
    cargarListaEvaluaciones() {
      axios.get('http://localhost:3000/api/evaluaciones')
        .then(response => {
          this.listaEvaluaciones = response.data;
        })
        .catch(error => {
          console.error('Error al cargar la lista de evaluaciones:', error);
        });
    },
  },
  mounted() {

    this.cargarListaEvaluaciones();
  },
};
</script>

<style scoped>
.crear-tarea-container {
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
textarea {
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
