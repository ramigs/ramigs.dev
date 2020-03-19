1. utilizador faz login (chamada ao endpoint "/auth/login" com credenciais inseridas)
2. resposta traz o token jwt
3. token é guardado na store
4. todas as chamadas seguintes à API adicionam o token no header
5. token é guardado numa cookie
6. quando o user revisita o site, se o token cookie existir nas cookies é guardado na store
7. é feito o pedido ao backend para que devolva o user associado ao token
8. user é guardado
   [16:40, 16/03/2020] João Petinga: a nos ainda nos fala outro passo que é:
9. se o token estiver guardado na store mas o backend responde com 401 significa que o token expirou, é necessário eliminar o token da store
