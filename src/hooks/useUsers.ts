import { useState } from "react";
import { LocalStorageService } from "@/services/localStorageService";
import { User } from "@/types/user";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>(LocalStorageService.getItem("users"));

  const addUser = (user: Omit<User, "id">) => {
    const storedData = LocalStorageService.getItem("users");

    let listUsers: User[] = storedData;

    if (storedData) {
      if (typeof storedData === "string") {
        listUsers = JSON.parse(storedData);
      } else if (Array.isArray(storedData)) {
        listUsers = storedData;
      }
    }

    if (!Array.isArray(listUsers)) {
      listUsers = [];
    }

    // Gerar ID
    const novoId =
      listUsers.length > 0 ? Math.max(...listUsers.map((u) => u.id)) + 1 : 1; // Começar com ID 1 se não houver usuários

    // Criar novo usuário
    const usuarioCompleto: User = {
      id: novoId,
      ...user,
      observacoes: user?.observacoes || "",
    };

    // Adicionar ao array e salvar
    const updatedUsers = [...listUsers, usuarioCompleto];
    LocalStorageService.setItem("users", updatedUsers);
  };

  const updateUser = (formValues: { nome: string; dataInicial: string; dataFinal: string; propriedades: number; laboratorio: number; id?: number | undefined; observacoes?: string | undefined; }) => {
    const updatedUsers = users.map((user) =>
      user.id === formValues.id ? formValues : user
    );

    LocalStorageService.setItem("users", updatedUsers);
  };

  const deleteUser = (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    LocalStorageService.setItem("users", updatedUsers);
    setUsers(updatedUsers);
  };

  return {
    addUser,
    updateUser,
    deleteUser,
    users,
  };
};
