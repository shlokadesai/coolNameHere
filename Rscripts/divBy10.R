d1<-data.frame(read.csv("C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/csv/cpi2012.csv"))
d2<-data.frame(read.csv("C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/csv/cpi2013.csv"))
d3<-data.frame(read.csv("C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/csv/cpi2014.csv"))

d1$CPI<-d1$CPI/10
d2$CPI<-d2$CPI/10
d3$CPI<-d3$CPI/10

write.csv(d1,paste("C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/csv/cpi2012.csv", sep=""),quote=FALSE, row.names=FALSE)
write.csv(d2,paste("C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/csv/cpi2013.csv", sep=""),quote=FALSE, row.names=FALSE)
write.csv(d3,paste("C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/csv/cpi2014.csv", sep=""),quote=FALSE, row.names=FALSE)