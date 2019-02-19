const messages = {
    "error": "Ошибочка",
    "success": "Успешно",
    "email_exists": "такой Email уже зарегистрирован",
    "user_not_found": "Пользователь не найден",
    "login_failed": "Не верный логин и/или пароль",
    "server_error": "Что-то пошло не так, напишите админу, он поможет)",
    "token_invalid": "Ошибка верификации, не верный токен",
    "message_go_spam": "Проблемы с отправкой сообщения",
    "message_send_error": "Проблемы с отправкой сообщения",
    "verify_message_sent": "Проверьте почту)",
    "register_error": "При регистрации произошла ошибка",
    "email_not_verified": "Не подтверждён email",
    "confirmed": "Email подтверждён",
    "password_changed": "Пароль изменен",
    "registered": "Регистрация прошла успешно, теперь подтвердите почту",
    "sent": "Отправлено"
};
export function getMessage(code) {
    return messages[code] ? messages[code] : code;
}