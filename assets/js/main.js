$(document).ready(function () {

  $("form").submit(function (event) {
    event.preventDefault();
    let valorInput = $("#superInput").val();
    alert(valorInput);

    $.ajax({
      url: "https://superheroapi.com/api/490220182310748/" + valorInput,
      success: function (data) {
        let imagen = data.image.url
        let nombre = data.name
        let conexiones = data.connections['group-affiliation']
        let publicado = data.biography.publisher
        let ocupacion = data.work.occupation
        let primeraAparicion = data.biography['first-appearance']
        let altura = data.appearance.height
        let peso = data.appearance.weight
        let alianzas = data.biography.aliases

        //Template correspondiente a la presentación del Super Heroe
        $("#superInfo").html(`
        <div class="card border-secondary mb-3">
          <div class="row g-0">
            <div class="col-12 col-sm-6">
              <img src="${imagen}" class="h-90 w-100" alt="Avatar">
            </div>
            <div class="col-12 col-sm-6">
              <div class="card-body">
                <h5 class="card-title"><b>Nombre: ${nombre}</b></h5>
                <p>Conexiones: ${conexiones}</p>
                <br>
                <p>Publicado: ${publicado}</p>
                <hr>
                <p>Ocupación: ${ocupacion}</p>
                <hr>
                <p>Primera aparición: ${primeraAparicion}</p>
                <hr>
                <p>Altura: ${altura}</p>
                <hr>
                <p>Peso: ${peso}</p>
                <hr>
                <p>Alianzas: ${alianzas}</p>
              </div>
            </div>
          </div>
        </div>`);

        let estadisticas = [];
        const stats = data.powerstats;
        for (const propiedades in stats) {
          estadisticas.push({ label: propiedades, y: Number(stats[propiedades]) });
        }
        
        let config = {

          animationEnable: true,
          title: {
            text: `Estadísticas de poder para ${nombre}`
          },

          data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} ({y})",
            dataPoints: estadisticas
          }],
        };

        let chart = new CanvasJS.Chart("infoHero", config);
        chart.render()

      }

    });

  });

});