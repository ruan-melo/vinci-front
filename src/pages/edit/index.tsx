// Exportar função para criar um HOC que irá construir as demais páginas de edit (profile, password e notifications )

// Ao inves do icone de configuração, colocar o nome edit no perfil quando for dono

// Ajustar bottombar para as settings mostrar change password , edit profile e edit notifications

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const { 'vinci:access_token': access_token } = parseCookies(ctx)

//   if (!access_token) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     }
//   }

//   return {
//     redirect: {
//       destination: '/edit/profile',
//     },
//   }
// }
