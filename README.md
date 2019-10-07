# podcast-app

Aplicación de podcast integrada con la API de AudioBoom para aprender Next.js

## ¿Comno funciona?
* `npm install` Para instalar las dependencias.
* `npm run dev` Para iniciar la aplicación en un entorno de desarrollo.
* `npm run build && npm start` Para iniciar la aplicación en un entorno productivo. 


Ver aplicación [Podcast-app](https://podcast-app.paolacalapizco.now.sh/)

## ¿Que es Next.js?

Next.js es un framework para construir aplicaciones web modernas en React. 
Una de sus principales características es que esta pensado para tener una 
excelente experiencia como desarrollador.

## Iniciar proyecto con Next.js

Instalación inicial de las dependencias:

`npm add next react react-dom`

"npm add es un alias de npm install --save"


### Scrips necesarios para proyecto 
**dev**: Entorno de desarrollo<br>
**build y start**: Entorno de producción 

Al archivo package.json agregamos:
```Javascript
"scripts": {
  "dev": "next",
  "build": "next build",
  "start": "next start"
}
```

## Ruteo

Next busca automaticamente todas las paginas en la carpeta **pages** de nuestro 
árbol de directorios del proyecto.

El router busca el mismo nombre de la ruta (**path**) que tenemos en carpeta
**/pages**

### Ejemplo: 
`GET` <br>
Muesta el archivo en **/pages/index.js**

`GET/Ejemplo`<br>
Muestra el archivo en **Pages/Ejemplo.js**

Cada página regresa un componente de React.js, ejemplo:
<br>
**index.js**

```javascript
export default HolaMundo extends React.Component {
    render(){
        return 
        (
            <div>
                <h1> Hola Mundo! </h1>
                <p> Bienvenidos a Next.js</p>
            </div>
        )
    }
}
```

## Style JSX

**Sryle JSX:** Sistema de estilos utilizado por Next.js. Este resuelve problemas
tipicos de CSS en React.js 

### ¿Porque Style JSX?

+ Es mas acorde a React.
+ Evitamos problemas de escalamiento en la aplicación.

#### ¿Cómo funciona? Es CSS3 normal pero solo se aplica al componente 
```html
<style jsx>{` 
    .clase {
      color: red;
    }
`}</style>
```
### Reglas de Style JSX
Solo aplica al componente en el cual estamos redactando los estilos, 
no se aplica a componentes externos o internos. <br>

Para romper estas reglas existe el atributo  `global` con el cual se pueden
manupular los estilos de otros componentes ya sean externos o internos.

**Ejemplo #1: ** En este ejemplo el body de toda la aplicación se va a colorear
de rojo
```html
<style jsx global>{`
  body {background: red}
`}<style>
```

**Ejemplo #2: ** En este ejemplo todas las etiquedas `p` que esten contenidas en
el `div` del **componente** se van a colorear de rojo.

```html
<style jsx>{`
  div :global(p){background: red}
`}<style>
```

## Archivos estaticos
Next.js rutea atuomaticamente los archivos que se encuentren en la carpeta
**/static** 

## Server Side Rendering vs Client Side Rendering

![Client Side Rendering](/docs-img/CSRpng.png)

Con el Client Side Rendering, el usuario debe de esperar un tiempo significativo 
para poder ver la aplicación. Esto se debe a que primero debe de descargar todo 
el JS y luego esperar a que cargue para poder visualizar algo.

![Server Side Rendering](/docs-img/SSR.png)

Con el Server Side Rendering, el servidor ya envía una HTML con CSS y, por ende, 
el usuario tiene que esperar mucho menos para tener una primera vista de 
la aplicación.

### ¿Qué ventajas tiene?

 + Mejor Performance.
 + Indexa en todos los servicios.


## getInitialProps

La función getInitialProps nos permite cargar el contenido principal de la 
página cuando tenemos que recurrir a una API.

```javascript
static async getInicialProps() {
  //aquí traemos los datos
  let request = await fetch('url')
  let datos = await request.json()
  return { datos }
}
```
Luego de cargar los datos, los agrega a las props del componente de React.

#### Desventajas 
 + Solo funciona en pages
 + Pertenece a Next.js, por ende no funcionara con otra libreria o framwork.
 
Al trabajar con Server Side Rendering ciertos métodos dejan de funcionar 
ya que estos se ejecutaban en el navegador pero con SSR su ejecución debera
ser desde el server.

para resolver esta problematica se recomienta la libreria ` isomorphic-fetch`

```javascript
npm add isomorphic-fetch
```
lo importamos en nuestra aplicación

```javascript
import 'isomorphic-fetch'
```


## Enlazando pagínas

Next.js posee el componente `<Link />` que nos permite "navegar" entre las
pages de nuestra app; debe tener a una etiqueda `<a />` como hijo para que
funcione.

```javascript
import Link from 'next/link'

<Link href="/myPage">
    <a>
        ...
    </a>
</Link>
```
**NOTA:** El atributo "href" debe ir dentro del componente no de la etiqueta.

### Funcionamiento:
Dependiendo la acción que realicemos con un elemento o componente que esta 
envuelto dentro del `<Link />` ocurre lo siguiente: 

**Click en sobre el link:**
 + Realiza: Client Side Rendering.
 + Solo carga lo que falta de la página.
 + Cambia la ruta en el navegador.
 
**Abrir un nuevo tab:**
 + Realiza: Server Side Rendering.
 + Carga todo el HTML, CSS y JS.
 + Crea una nueva sesión.
 

### prefetch

Atributo que pertenece a **Link**, lo que hace es decirle a next.js que ese link
es importante y que es necesario ir precargando la información de este en el 
navegador.

 + No carga los getInitialProps.
 + Carga solo el payload  (HTML, CSS y JS).
 + Solo se precarga una vez.
 + Solo funciona en producción. `npm run build && npm start`


# Deploy 

Utilizamos Now.sh para desplegar nuestra aplicación en producción.
Si no tenemos instalado now encones: `npm install -g now`

En la raíz del proyecto crear un archivo llamada now.json con la siguiente estructura:
```javascript
{
  "version": 2,
	"builds": [
		{ "src": "package.json", "use": "@now/next" }
	]
}
```

Con el comando `now --public` now.sh lleva esta aplicación a producción.