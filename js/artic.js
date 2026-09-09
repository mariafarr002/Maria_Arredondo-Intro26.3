/*  =====================
  Global variables for sections
  ====================== */
const artworkSection = document.querySelector("#artwork")
// const dateSection = document.querySelector("#dates")
const exhibitionSection = document.querySelector("#exhibitions")

/*  =====================
  Async Await functions 
  for two GET Fetch requests
  ====================== */

// 1st GET request, endpoint 1
async function fetchArtwork() {
  try {
    const response = await fetch(
      "https://api.artic.edu/api/v1/artworks?fields=title,date_display,artist_title,medium_display,dimensions,is_public_domain,image_id,limit=10&page=3",
    )
    if (!response.ok) {
      throw new Error("Request failed" + response.status)
    }

    const data = await response.json()
    console.log("artworks:", data)
    const artworks = data.data
    const urlBase = data.config.iiif_url

    artworkSection.innerHTML = ""

    artworks.forEach((item) => {
      // Skips over artworks that are NOT in the public domain
      if (item.is_public_domain === false) return

      const imageElement = document.createElement("img")
      imageElement.src = `${urlBase}/${item.image_id}/full/200,/0/default.jpg`
      artworkSection.appendChild(imageElement)

      const artworkElement = document.createElement("p")
      artworkElement.textContent = `${item.title} (${item.date_display}) by ${item.artist_title}  ${item.medium_display} ${item.dimensions}`
      artworkSection.appendChild(artworkElement)
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

    exhibitionSection.innerHTML = ""

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

      exhibitionElement.textContent = `${item.title}, ${start} - ${end}`
      exhibitionSection.appendChild(exhibitionElement)
    })
  } catch (error) {
    exhibitionSection.innerHTML = "ERROR: Something went wrong..."
    console.error("Something went wrong...:", error)
  }
}

// btn retrieves 1st GET request, endpoint 1
document.querySelector("#btn-artwork").addEventListener("click", () => {
  fetchArtwork()
})

// btn retrieves 2nd GET request, endpoint 2
document.querySelector("#btn-exhibitions").addEventListener("click", () => {
  fetchExhibitions()
})
