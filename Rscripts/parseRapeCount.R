d<-read.csv("C:/Users/Tapasya/Desktop/HackArizona/coolNameHere/data/rapeCount.csv", header=TRUE,as.is=TRUE)

library('countrycode')

#Replace NAs with -1
d[is.na(d)]<- (-1)

#Add iso3 country codes
d$ID<-countrycode(d$Country,"country.name", "iso3c")

#New dataframe with split sections
d2<-paste(d$Country,d$c2003,d$r2003,"2003",sep=",")
d2<-c(d2,paste(d$Country,d$c2004,d$r2004,"2004",sep=","))
d2<-c(d2,paste(d$Country,d$c2005,d$r2005,"2005",sep=","))
d2<-c(d2,paste(d$Country,d$c2006,d$r2006,"2006",sep=","))
d2<-c(d2,paste(d$Country,d$c2007,d$r2007,"2007",sep=","))
d2<-c(d2,paste(d$Country,d$c2008,d$r2008,"2008",sep=","))
d2<-c(d2,paste(d$Country,d$c2009,d$r2009,"2009",sep=","))
d2<-c(d2,paste(d$Country,d$c2010,d$r2010,"2010",sep=","))
d2<-c(d2,paste(d$Country,d$c2011,d$r2011,"2011",sep=","))
d2<-c(d2,paste(d$Country,d$c2012,d$r2012,"2012",sep=","))


write.csv(d2,"rapeDataTest.csv",quote=FALSE,row.names=FALSE)