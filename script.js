// Токен бота (замените на свой токен!)
const BOT_TOKEN = "MTMzNzIxMDc2NDY4Mjk4OTYxOQ.GvqZJO.TB9MehYFwcYNa45GOeRnaVpICq7cOutWpY9ItY";
const API_URL = "https://discord.com/api/v10";

// Получение списка каналов сервера
document.getElementById("getChannels").addEventListener("click", async () => {
  const guildId = prompt("Введите ID сервера:");
  if (!guildId) return alert("ID сервера не указан.");

  const channelsList = document.getElementById("channelsList");
  channelsList.innerHTML = "Загрузка...";

  try {
    const response = await fetch(`${API_URL}/guilds/${guildId}/channels`, {
      headers: {
        "Authorization": `Bot ${BOT_TOKEN}`,
      },
    });
    const channels = await response.json();
    channelsList.innerHTML = "";

    if (Array.isArray(channels)) {
      channels.forEach(channel => {
        const li = document.createElement("li");
        li.textContent = `${channel.name} (ID: ${channel.id}, Тип: ${channel.type})`;
        channelsList.appendChild(li);
      });
    } else {
      alert("Ошибка при получении каналов.");
    }
  } catch (error) {
    console.error(error);
    alert("Ошибка при выполнении запроса.");
  }
});

// Добавление новой команды
let commands = []; // Локальное хранилище команд
document.getElementById("addCommand").addEventListener("click", () => {
  const commandName = document.getElementById("commandName").value;
  const commandResponse = document.getElementById("commandResponse").value;

  if (!commandName || !commandResponse) return alert("Заполните все поля.");

  commands.push({ name: commandName, response: commandResponse });

  const commandsList = document.getElementById("commandsList");
  const li = document.createElement("li");
  li.textContent = `${commandName}: ${commandResponse}`;
  commandsList.appendChild(li);

  alert(`Команда "${commandName}" добавлена.`);
});

// Отправка уведомления
document.getElementById("sendNotification").addEventListener("click", async () => {
  const channelId = document.getElementById("notificationChannelId").value;
  const notificationContent = document.getElementById("notificationContent").value;

  if (!channelId || !notificationContent) return alert("Заполните все поля.");

  try {
    const response = await fetch(`${API_URL}/channels/${channelId}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bot ${BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: notificationContent }),
    });

    if (response.ok) {
      alert("Уведомление отправлено!");
    } else {
      const error = await response.json();
      alert(`Ошибка: ${error.message}`);
    }
  } catch (error) {
    console.error(error);
    alert("Ошибка при выполнении запроса.");
  }
});
