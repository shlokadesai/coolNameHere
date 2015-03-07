filenames <- list.files(path="C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/csv")  
numfiles <- length(filenames) 
library('countrycode')

for (i in 1:numfiles) {
  d<-data.frame(read.csv(paste("C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/csv/",filenames[i],sep="")))
  d$ID<-countrycode(d$Country,"country.name", "iso3c")
  write.csv(d,paste(filenames[i],quote=FALSE, row.names=FALSE)
}