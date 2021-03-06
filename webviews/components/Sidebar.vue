<template>
  <div>
    <h1>Hello Ravindraaaaaaaa :D</h1>
    <h2>Enter your tasks here...</h2>
    <div>
      <input v-model="task"/>
    </div>
    <button @click="addTask" :disabled="!task">Add Task</button>

    <h3>Pending tasks</h3>
    <ul>
      <li 
        v-for="(t, index) in tasks" :key="`pending_${index}`"
        style="display:flex;justify-content:center;align-items:center;"
      >
        {{ t }}
        <button @click="markAsDone(t)">Done</button>
      </li>
    </ul>

    <h3>Completed tasks</h3>
    <ul>
      <li v-for="(t, index) in completed" :key="`completed_${index}`">
        {{ t }}
      </li>
    </ul>
  </div>
</template>
<script>
import Vue from "vue";
export default Vue.extend({
  data(){
    return {
      task: "",
      tasks: [],
      completed: [],
    }
  },
  methods: {
    addTask(){
      this.tasks.push(this.task);
      console.log("qwe:", { hello: _vscode })
      _vscode.postMessage({
        type: 'onInfo',
        value: `${this.task} added to the tasks :)`
      });
      this.task = "";
    },
    markAsDone(task){
      let idx = this.tasks.indexOf(task);
      this.tasks.splice(idx, 1);
      console.log({ task })
      this.completed.push(task);

      this.$vscode.postMessage({
        type: 'onInfo',
        value: `${task} marked as completed :)`
      });
    }
  }
})
</script>
<style scoped>
h1{
  color: pink;
}
</style>