filenames <- list.files(path="C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/csv")  
numfiles <- length(filenames) 

d<-list()
for (i in 1:numfiles) {
  d[[i]]<-read.csv(paste("C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/csv/",filenames[i],sep=""))
}

m<-c()
for (i in 1:numfiles){
  m<-c(m,median(d[[i]]$CPI))
  
}