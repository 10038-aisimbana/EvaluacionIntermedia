<template>
  <div id="app" class="flex-container">
    <IngresarEstudiante class="componente"/>
    <CrearTarea class="componente"/>
    <AsignarTarea :listaEstudiantes="listaEstudiantes" :listaEvaluaciones="listaEvaluaciones"/>
  </div>
</template>

<script>
import CrearTarea from './components/CrearTarea.vue'
import AsignarTarea from './components/AsignarTarea.vue'
import IngresarEstudiante from './components/IngresarEstudiante.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    IngresarEstudiante,
    CrearTarea,
    AsignarTarea,
  },
  data() {
    return {
      listaEstudiantes: [],
      listaEvaluaciones: [],
    };
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


    axios.get('http://localhost:3000/api/evaluaciones')
      .then(response => {
        this.listaEvaluaciones = response.data;
        console.log('Lista de evaluaciones cargada:', response.data);
      })
      .catch(error => {
        console.error('Error al obtener la lista de evaluaciones:', error);
      });
  },
};
</script>

<style>
#app {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0 20px;
}

.componente {
  
  padding: 10px;
}
</style>