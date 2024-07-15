import { ref } from 'vue';
const userRole = ref(null);

const setUserRole = (role) => {
  userRole.value = role;
};

export { userRole, setUserRole };