/*  =====================
  Global variables for sections
  ====================== */
const artworkSection = document.querySelector("#artwork")
// const dateSection = document.querySelector("#dates")
const exhibitionSection = document.querySelector("#exhibitions")
const artworkHeading = document.querySelector("#artwork-heading")
const exhibitionHeading = document.querySelector("#exhibition-heading")

/*  =====================
  Async Await functions 
  for two GET Fetch requests
  ====================== */

// 1st GET request, endpoint 1
async function fetchArtwork() {
  try {
    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks?fields=title,date_display,artist_title,medium_display,dimensions,is_public_domain,image_id",
    )
    if (!response.ok) {
      throw new Error("Request failed: " + response.status)
    }

    const data = await response.json()
    console.log("artworks:", data)
    const artworks = data.data
    const urlBase = data.config.iiif_url

    //clears section
    artworkSection.innerHTML = ""

    //clears other html in section, only showing one section at a time
    exhibitionSection.innerHTML = ""
    exhibitionHeading.textContent = ""

    //creates heading for Artwork section
    artworkHeading.textContent = "Artworks"

    artworks.forEach((item) => {
      // Skips over images that are have null, undefined, and missing image_id's
      if (!item.image_id) return
      // Skips over images NOT in the public domain
      if (!item.is_public_domain) return

      const card = document.createElement("div")
      card.classList.add("art-card")

      const imageElement = document.createElement("img")
      imageElement.src = `${urlBase}/${item.image_id}/full/200,/0/default.jpg`

      const artworkElement = document.createElement("p")
      artworkElement.textContent = `${item.title}\n(${item.date_display})\n${item.artist_title}\n${item.medium_display}\n${item.dimensions}`

      card.appendChild(imageElement)
      card.appendChild(artworkElement)
      artworkSection.appendChild(card)
    })
  } catch (error) {
    artworkSection.innerHTML = "ERROR: Something went wrong..."
    console.error("Something went wrong...:", error)
  }
}

// 2nd GET request, endpoint 2
async function fetchExhibitions() {
  try {
    const response = await fetch(
      "https://api.artic.edu/api/v1/exhibitions?fields=title,aic_start_at,aic_end_at",
    )
    if (!response.ok) {
      throw new Error("Request failed" + response.status)
    }

    const data = await response.json()
    console.log("exhibitions:", data)
    const exhibitions = data.data

    //clears section
    exhibitionSection.innerHTML = ""

    //clears other html in section, only showing one section at a time
    artworkSection.innerHTML = ""
    artworkHeading.textContent = ""

    //creates heading for Exhibitions section
    exhibitionHeading.textContent = "Exhibitions"

    exhibitions.forEach((item) => {
      const exhibitionElement = document.createElement("p")

      // makes date data from API legible and looks out for unavailable dates
      // sends message if date is null, undefined, or missing
      let start = "No start date available"
      if (item.aic_start_at) {
        const startDate = new Date(item.aic_start_at)
        if (!isNaN(startDate.getTime())) {
          start = startDate.toLocaleDateString()
        }
      }
      let end = "No end date available"
      if (item.aic_end_at) {
        const endDate = new Date(item.aic_end_at)
        if (!isNaN(endDate.getTime())) {
          end = endDate.toLocaleDateString()
        }
      }

      exhibitionElement.textContent = `${item.title}\n${start} - ${end}`
      exhibitionSection.appendChild(exhibitionElement)
    })
  } catch (error) {
    exhibitionSection.innerHTML = "ERROR: Something went wrong..."
    console.error("Something went wrong...:", error)
  }
}
/*  =====================
  Button calls to Fetch requests
  ====================== */
// btn displays 1st GET request, endpoint 1
document.querySelector("#btn-artwork").addEventListener("click", () => {
  fetchArtwork()
})

// btn displays 2nd GET request, endpoint 2
document.querySelector("#btn-exhibitions").addEventListener("click", () => {
  fetchExhibitions()
})
