<template>
    <div class="form-container">
      <h2>Edit Student</h2>
      <form @submit.prevent="updateStudent">
        <div>
          <label for="name">Name: </label>
          <input type="text" id="name" v-model="student.name" required />
        </div>
        <div>
          <label for="class">Class: </label>
          <input type="text" id="class" v-model="student.class" required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        student: {}, // Holds the student being edited
        index: null, // Index of the student
      };
    },
    created() {
      // Retrieve the student and index from the route params
      this.student = { ...this.$route.params.student };
      this.index = this.$route.params.index;
    },
    methods: {
      updateStudent() {
        // Emit updated data to the parent component
        this.$router.push({
          name: 'StudentForm',
          query: { message: 'Update successfully' }, // Optional query for messaging
        });
        alert('Update successfully');
      },
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  